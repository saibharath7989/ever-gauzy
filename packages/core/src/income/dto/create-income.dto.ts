import { IIncomeCreateInput } from "@gauzy/contracts";
import { IntersectionType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { IncomeDTO } from "./income.dto";

export class CreateIncomeDTO extends IntersectionType(
    IncomeDTO,
    EmployeeFeatureDTO,
    RelationalTagDTO
) implements IIncomeCreateInput {

    @ApiProperty({ type: () => String, readOnly: true })
    @IsString()
    @IsNotEmpty()
    readonly clientId: string;
}