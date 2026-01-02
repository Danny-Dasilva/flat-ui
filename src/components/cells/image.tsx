import { Fragment } from 'react';
import DOMPurify from 'dompurify';
import 'twin.macro';

interface ImageCellProps {
  value: string;
  formattedValue: string;
  rawValue: string;
}

export function ImageCell(props: ImageCellProps) {
  const isUrl = props.value?.startsWith('http') || props.value?.startsWith('data:');
  const isSvg = props.value?.trim().startsWith('<svg');

  return (
    <Fragment>
      {isUrl ? (
        <img
          src={props.value}
          alt=""
          tw="h-8 w-8 object-contain flex-shrink-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : isSvg ? (
        <div
          tw="h-8 w-8 flex-shrink-0"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.value, { USE_PROFILES: { svg: true } }),
          }}
        />
      ) : null}
      <div
        tw="truncate ml-2"
        title={props.rawValue}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(props.formattedValue),
        }}
      />
    </Fragment>
  );
}
