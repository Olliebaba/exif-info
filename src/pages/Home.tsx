import type {ReactElement} from "react";
import {useState} from "react";
import ExifReader from 'exifreader';
import ExifData from "../components/ExifData";


export default function Home(): ReactElement {
  const [inputValue, setInputValue] = useState<File[]>([])
  const [exifData, setExifData] = useState<ExifReader.Tags | null>()

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (event: React.FormEvent<HTMLInputElement>): Promise<void> => {
    const {
      currentTarget: {
        files,
      }
    } = event

    if (files) {
      setInputValue((): File[] => [...files]);

      const tags = await ExifReader.load(files[0]);
      setExifData(() => tags)
    } else {
      setInputValue(() => [])
      setExifData(() => null)
    }

    // eslint-disable-next-line no-console
    console.log('inputValue', inputValue)
  }

  return (
    <div className="m-1 flex flex-col">
      <h1>EXIF Info</h1>
      <p>Add an image (.JPG/.TIFF) to see what meta information is contained within it.</p>
      <hr />
      <input accept="image/tiff, image/jpeg, image/heic" type='file' onChange={onChange}/>
      {
        exifData ? <ExifData exifData={exifData} /> : undefined
      }
    </div>
  )
}
