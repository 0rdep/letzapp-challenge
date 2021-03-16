import { ExecutionContext } from '@nestjs/common';
import { TokenMatchUserGuard } from './token-match-user.guard';

const createMockedContext = (userId: number, trainerId: number) => ({
  switchToHttp: () => ({
    getRequest: () => ({
      user: { id: userId },
      params: {
        trainerId,
      },
    }),
  }),
});

describe('TokenMatchUserGuard', () => {
  it('Should return true if token and trainerId match', async () => {
    const context = createMockedContext(1, 1) as ExecutionContext;

    const guard = new TokenMatchUserGuard();
    expect(guard.canActivate(context)).toBe(true);
  });

  it("Should return false if token and trainerId don't match", async () => {
    const context = createMockedContext(1, 2) as ExecutionContext;

    const guard = new TokenMatchUserGuard();
    expect(guard.canActivate(context)).toBe(false);
  });
});
