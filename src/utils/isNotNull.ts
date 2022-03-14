export default function isNotNull<T> (arg: null | T): arg is T {
  return arg != null;
}
