export default function Payment() {
  console.log(process.env.REACT_APP_stripe_pk);
  return <div>{process.env.REACT_APP_stripe_pk}</div>;
}
