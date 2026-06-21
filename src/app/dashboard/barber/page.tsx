import { signOut } from "@/lib/auth";
export default function BarberDashboard() {
  return (
    <div className="div">
      <h1>Barber Dashbord</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
