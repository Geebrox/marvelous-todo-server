import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator';

enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvVars {
  @IsEnum(Env) NODE_ENV: Env;
  @IsString() @IsNotEmpty() CLIENT_HOST: string;
}

export const validateObject = <T>(type: ClassConstructor<T>, obj = {}) => {
  const convertedType = plainToInstance(type, obj, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(convertedType as any, {
    skipMissingProperties: false,
  });

  return [convertedType, errors] as [T, typeof errors];
};

export const validateEnv = (config: Record<string, unknown>) => {
  const [validatedConfig, errors] = validateObject(EnvVars, config);

  if (errors.length > 0) {
    const missingFields: string[] = [];
    const invalidFields: string[] = [];

    errors.forEach((error) => {
      (typeof error.value === 'undefined' ? missingFields : invalidFields).push(
        error.property
      );
    });

    let errorMessage =
      'Your .env file was configured incorrectly. ' +
      'Please, check .env.example and fix all invalid or missing fields!';

    if (missingFields.length > 0) {
      errorMessage += '\nMissing fields:';
      missingFields.forEach((field) => {
        errorMessage += `\n\t- ${field}`;
      });
    }

    if (invalidFields.length > 0) {
      errorMessage += '\nInvalid fields:';
      invalidFields.forEach((field) => {
        errorMessage += `\n\t- ${field}`;
      });
    }

    throw new Error(errorMessage);
  }

  return validatedConfig;
};
