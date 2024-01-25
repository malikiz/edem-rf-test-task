export function plural(forms: [string, string, string], count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return forms[0]
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return forms[1]
  }

  return forms[2]
}
