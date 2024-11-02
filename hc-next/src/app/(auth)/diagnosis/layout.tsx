import "~/styles/globals.css";
import Header from "~/components/layout/Header";


export default function DiagnosisLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      </div>
  );
}
