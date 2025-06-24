export function setSelectNone() {
  const body = document?.body;
  if (!body) return;
  body.style.userSelect = "none";
}

export function removeSelectNone() {
  const body = document?.body;
  if (!body) return;
  body.style.userSelect = "auto";
}
