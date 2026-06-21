import { signOut } from "@/lib/auth";
export default function ClientDashboard() {
  return (
    <div className="div">
      <h1>Client Dashbord</h1>
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
