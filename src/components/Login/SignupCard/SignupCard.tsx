"use client";

import { userRegister } from "@/lib/LoginRegisterApis";
import styles from "./SignupCard.module.scss";
import { User, Mail, Lock, Eye } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ToastProvider";

export default function SignupCard() {
  // console.log("SignupCard component rendered");
  const [role, setRole] = useState<"creator" | "brand">("creator");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rolenumber, setRoleNumber] = useState<number>(1);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (role === "creator") {
      setRoleNumber(1);
    } else {
      setRoleNumber(3);
    }
  }, [role]);

  const handleSubmit = async () => {
    // console.log("Button clicked");
    // e.preventDefault();

    const formData = {
      name,
      email,
      password,
      role: rolenumber,
    };

    try {
      const user = await userRegister(formData);
      if(user?.message === "Already registered please login"){
        showToast(user?.message, "info");
        router.replace("/login");
        return


      }
      if(user?.success){
        showToast("Loggedin Successfully", "info");
        router.replace("/login");

      }
      if (user?.message) {
        showToast(user?.message, "info");
        return;
      }
      
    } catch (error) {
      showToast("Something went Wrong", "error");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <div className={styles.brand}>
          <span className={styles.logo}>✽</span>
          <span>VidoraHub Studio</span>
        </div>

        <div className={styles.hero}>
          <h1>Connect without boundaries.</h1>

          <p>
            The all-in-one workspace for modern creators and forward-thinking
            brands to collaborate and scale.
          </p>
        </div>

        <div className={styles.users}>
          {/* <div className={styles.avatars}>
            <Image src="/avatar1.png" alt="" width={28} height={28} />
            <Image src="/avatar2.png" alt="" width={28} height={28} />
            <Image src="/avatar3.png" alt="" width={28} height={28} />
          </div> */}

          {/* <span>Join 10k+ creators today</span> */}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.right}>
        <h2>Join VidoraHub</h2>
        <p className={styles.subtitle}>Start your creative journey today</p>

        {/* ROLE SWITCH */}
        <div className={styles.roleSwitch}>
          <button
            className={role === "creator" ? styles.activeRole : ""}
            onClick={() => setRole("creator")}
          >
            Creator
          </button>

          <button
            className={role === "brand" ? styles.activeRole : ""}
            onClick={() => setRole("brand")}
          >
            Brand
          </button>
        </div>

        {/* INPUTS */}
        <div className={styles.form}>
          <label>Full Name</label>

          <div className={styles.input}>
            <User size={16} />
            <input
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <label>Email Address</label>

          <div className={styles.input}>
            <Mail size={16} />
            <input
              placeholder="hello@vidorahub.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>

          <div className={styles.input}>
            <Lock size={16} />
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Eye
              size={16}
              onClick={() => setShow(!show)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* <div className={styles.terms}>
            <input type="checkbox" />
            <span>
              I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </span>
          </div> */}

          <button type="button" className={styles.cta} onClick={handleSubmit}>
            Create Account →
          </button>

          <p className={styles.login}>
            Already have an account? <Link href={"/login"}>Log In</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
