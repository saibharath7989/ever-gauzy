import { IGetTimeLogReportInput, ReportGroupFilterEnum } from "@gauzy/contracts";
import { IntersectionType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { FiltersQueryDTO, SelectorsQueryDTO } from "../../../../shared/dto";

/**
 * Get time log request DTO validation
 */
export class TimeLogQueryDTO extends IntersectionType(
    FiltersQueryDTO,
    SelectorsQueryDTO
) implements IGetTimeLogReportInput {

    @ApiPropertyOptional({ type: () => Array, enum: ReportGroupFilterEnum, readOnly: true })
    @IsOptional()
    @IsEnum(ReportGroupFilterEnum)
    readonly groupBy: ReportGroupFilterEnum;

    @ApiPropertyOptional({ type: () => Array, isArray: true, readOnly: true })
    @IsOptional()
    @IsArray()
    readonly relations: string[];

    @ApiPropertyOptional({ type: () => String, readOnly: true })
    @IsOptional()
    @IsString()
    readonly timesheetId: string;
}