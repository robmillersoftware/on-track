export const billDotComAccessResource = '/VcfoBillDotComControllerRequest';

export const billDotComAccessMap = dto => ({
  active: dto.billDotComOnOff,
  enrolled: dto.enrolled
});
