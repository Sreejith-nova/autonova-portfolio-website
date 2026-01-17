"use client";
import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./AceternityNavbar";

export function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen } = useModal();

  // Hide navbar completely when modal is open
  if (isModalOpen) {
    return null;
  }

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Work", link: "/work" },
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="relative z-20 ml-auto">
          <NavbarButton href="https://cal.com/autonova-mfsbch/30min" variant="dark">
            Book a Call
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-neutral-600 dark:text-neutral-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <NavbarButton href="https://cal.com/autonova-mfsbch/30min" variant="dark">
            Book a Call
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
