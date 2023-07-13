import type { ReactElement } from "react";
import type { Tags } from "exifreader";

interface Properties {
  exifData: Tags
}
export default function ExifData(properties: Properties): ReactElement<Properties> {
  const {
    exifData
  } = properties

  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {JSON.stringify(exifData, undefined, 2)}
    </div>
  )
}