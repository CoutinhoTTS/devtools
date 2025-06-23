export default function (value: string | number) {
  if (typeof value === "string")
    return value.endsWith("px") ? +value.slice(0, -2) : +value;
  return value;
}
