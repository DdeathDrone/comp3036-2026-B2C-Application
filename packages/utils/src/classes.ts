export function cx(
  ...classes: Array<
    string | Record<string, boolean | null | undefined> | null | undefined
  >
): string {
  // class helper that turns a list of classes into a single string
  // if one of the classes is an object, it will add the key if the value is truthy

  // e.g. cx("foo", "bar") => "foo bar"
  // e.g. cx("foo", { bar: true }) => "foo bar"
  let result = "";
  for(const c of classes){
    if(typeof(c) == "object" && c != null){
      for(const k in c){
        if (c[k]){
          result = result + k + " "
        }
      }
    }
    else if (c != null && c != undefined){
      result = result + c + " "
    }
  }
  return result.trim();
}

export default cx;
