export interface JwtPayload {
  sub: string;      // viatura id
  vt:  string;      // vehicleType
  role: 'patrulha' | 'central';
  iat?: number;
  exp?: number;
}
