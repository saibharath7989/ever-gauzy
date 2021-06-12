import { Body, Controller, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ITenantCreateInput, IUserRegistrationInput } from '@gauzy/contracts';
import { TenantPermissionGuard } from './../shared/guards';
import { GauzyCloudUserMigrateCommand } from './commands/gauzy-cloud-user.migrate.command';
import { TransformInterceptor } from './../core/interceptors/transform.interceptor';
import { GauzyCloudTenantMigrateCommand } from './commands/gauzy-cloud-tenant.migrate.command';

@Controller()
export class GauzyCloudController {
	
	constructor(
		private readonly commandBus: CommandBus
	) {}

	@ApiOperation({ summary: 'Migrate self hosted to gauzy cloud hosted' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The user has been successfully created in the Gauzy cloud.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard)
	@UseInterceptors(TransformInterceptor)
	@Post()
	async migrateToCloud(@Body() body: IUserRegistrationInput) {
		return this.commandBus.execute(
			new GauzyCloudUserMigrateCommand(body)
		);
	}

	@ApiOperation({ summary: 'Migrate self hosted tenant into the gauzy cloud tenant' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The tenant has been successfully created in the Gauzy cloud.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description:
			'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(AuthGuard('jwt'), TenantPermissionGuard)
	@Post('tenant/:token')
	async migrateTenant(
		@Body() body: ITenantCreateInput,
		@Param('token') token: string
	) {
		return this.commandBus.execute(
			new GauzyCloudTenantMigrateCommand(body, token)
		);
	}
}