import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransferDto {
  @ApiProperty({
    description: 'Id externo da transferência',
  })
  @IsString()
  externalId: string;

  @ApiProperty({
    description: 'Quantidade em centavos',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    required: false,
    description: 'Data de vencimento (opcional)',
  })
  @IsOptional()
  @IsDate()
  expectedOn?: Date;
}
