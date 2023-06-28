import {argv} from "node:process";

export const getMode = () => {
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--mode=')) {
      return arg.split('=')[1];
    }
  }
};