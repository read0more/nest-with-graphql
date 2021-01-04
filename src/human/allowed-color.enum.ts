import { registerEnumType } from '@nestjs/graphql';

export enum AllowedColor {
  RED,
  GREEN,
  BLUE,
}

registerEnumType(AllowedColor, {
  name: 'AllowedColor',
});
