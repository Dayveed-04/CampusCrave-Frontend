import React from 'react';
import clsx from 'clsx';

export function Flex({
  direction = 'row',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  flex = '0 1 auto',
  gap = 'var(--flexGap)', 
  style = {},
  className = '',
  children,
  ...props
}) {


  const gapClass = gap.startsWith('gap-') ? gap : '';

  return (
    <div
      className={clsx(
        'flex',
        direction === 'row' && 'flex-row',
        direction === 'column' && 'flex-col',
        alignItems === 'stretch' && 'items-stretch',
        alignItems === 'center' && 'items-center',
        alignItems === 'start' && 'items-start',
        alignItems === 'end' && 'items-end',
        justifyContent === 'flex-start' && 'justify-start',
        justifyContent === 'center' && 'justify-center',
        justifyContent === 'flex-end' && 'justify-end',
        justifyContent === 'between' && 'justify-between',
        gapClass,
        className
      )}
      style={{
        flex,
        gap: !gapClass ? gap : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}


export function Row({ tocolumn = false, className = '', children, ...props }) {
  return (
    <Flex
      direction="row"
      className={clsx(
        tocolumn && 'lg:flex-row flex-col',
        !tocolumn && 'flex-row',
        className
      )}
      {...props}
    >
      {children}
    </Flex>
  );
}


export function Column({ torow = false, className = '', children, ...props }) {
  return (
    <Flex
      direction="column"
      className={clsx(
        torow && 'lg:flex-row flex-col',
        !torow && 'flex-col',
        className
      )}
      {...props}
    >
      {children}
    </Flex>
  );
}
