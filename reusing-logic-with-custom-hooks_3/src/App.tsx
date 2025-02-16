import { useState } from 'react';
import { useCounter } from './useCounter';

export default function Counter() {
  const count = useCounter(1000);
  return <h1>Seconds passed: {count}</h1>;
}
