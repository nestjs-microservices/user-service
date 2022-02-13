import { ExecutionContext } from '@nestjs/common';

export function formatCommand(command: string): string {
  const cmd = command.replace(/([A-Z])/g, ' $1').toLowerCase();
  return cmd.charAt(0).toUpperCase() + cmd.slice(1);
}

export function getCommand(context: ExecutionContext): string {
  const [args, tcpContext] = context.getArgs();
  const { args: tcpContextArgs } = tcpContext;
  const [_, pattern] = tcpContextArgs;
  const { cmd } = JSON.parse(pattern);
  return cmd;
}