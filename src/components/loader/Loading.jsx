import { Spinner } from "@material-tailwind/react";
import style from "./loader.module.css"

export function Loader() {
  return (
    <div className={style.loader}>
      <Spinner color="amber" />
      Loading...
    </div>
  );
}