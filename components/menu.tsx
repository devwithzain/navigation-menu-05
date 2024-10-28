"use client";
import gsap from "gsap";
import Link from "next/link";
import { motion } from "framer-motion";
import { navItems, socialItems } from "@/constants";
import { useEffect, useState } from "react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function Menu() {
	const [isAnimating, setIsAnimating] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	CustomEase.create(
		"hop",
		"M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
	);
	useEffect(() => {
		const menuToggle = document.querySelector("#menu-toggle");
		const menu = document.querySelector("#menu");
		const links = document.querySelectorAll<HTMLElement>("#link");
		const socialLinks = document.querySelectorAll<HTMLElement>("#socials p");

		const openMenu = () => {
			setIsAnimating(true);
			gsap.to(menu, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "hop",
				duration: 1.5,
				onStart: () => {
					(menu as HTMLElement).style.pointerEvents = "all";
				},
				onComplete: () => {
					setIsAnimating(false);
				},
			});

			gsap.to(links, {
				y: 0,
				opacity: 1,
				stagger: 0.1,
				delay: 0.85,
				duration: 1,
				ease: "power3.out",
			});

			gsap.to(socialLinks, {
				y: 0,
				opacity: 1,
				stagger: 0.05,
				delay: 0.85,
				duration: 1,
				ease: "power3.out",
			});

			gsap.to(".video-wrapper", {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "hop",
				duration: 1.5,
				delay: 0.5,
			});
		};

		const closeMenu = () => {
			setIsAnimating(true);
			gsap.to(menu, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
				ease: "hop",
				duration: 1.5,
				onComplete: () => {
					(menu as HTMLElement).style.pointerEvents = "none";
					gsap.set(menu, {
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					});
					gsap.set(links, { y: 30, opacity: 0 });
					gsap.set(socialLinks, { y: 30, opacity: 0 });
					gsap.set(".video-wrapper", {
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					});
					setIsAnimating(false);
				},
			});
		};

		const toggleMenu = () => {
			if (isAnimating) return;
			if (menuOpen) {
				closeMenu();
				setMenuOpen(false);
			} else {
				openMenu();
				setMenuOpen(true);
			}
		};

		menuToggle?.addEventListener("click", toggleMenu);

		return () => {
			menuToggle?.removeEventListener("click", toggleMenu);
		};
	}, [isAnimating, menuOpen]);

	return (
		<div className="w-full h-screen bg-[url('/hero.jpg')] bg-cover bg-center">
			<div className="w-full flex justify-between items-center px-8 py-4 fixed top-0 left-0 z-50">
				<Link
					href="/"
					className={`uppercase text-[60px] xm:text-[40px] sm:text-[40px] font-light transition-all duration-300 ease-in-out delay-1000 ${
						menuOpen && "text-white "
					}`}>
					avaro
				</Link>
				<div
					className={`menu-toggle fixed top-8 right-8 sm:top-4 xm:top-4 sm:right-4 xm:right-4 sm:h-[50px] xm:h-[50px] w-[120px] h-[60px] bg-[#0f0f0f] rounded-full origin-right cursor-pointer z-20 ease-[0.075, 0.82, 0.165, 1] ${
						menuOpen ? "opened" : "closed"
					}`}
					id="menu-toggle">
					<div className="menu-toggle-icon sm:h-[50px] xm:h-[50px]">
						<div className="hamburger">
							<div
								className="menu-bar"
								data-position="top"></div>
							<div
								className="menu-bar"
								data-position="bottom"></div>
						</div>
					</div>
					<div className="menu-copy">
						<p className="uppercase text-white text-[60px] font-light">Menu</p>
					</div>
				</div>
			</div>

			<div
				className="menu"
				id="menu">
				<div className="relative h-full flex flex-col items-end justify-between pt-32 px-8 pb-8 flex-1 sm:items-start xm:items-start">
					<div>
						{navItems.map((item) => (
							<div
								key={item.id}
								className="relative translate-y-7 opacity-0"
								id="link">
								<Link
									className="text-white text-[48px] font-normal tracking-tighter leading-tight"
									href={item.href}>
									{item.title}
								</Link>
							</div>
						))}
					</div>
					<div
						className="video-wrapper w-full h-[400px] bg-[#1a1a1a] overflow-hidden p-8 rounded-[10px]"
						style={{
							clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
						}}>
						<video
							className="w-full h-full object-cover"
							muted
							src="/video.mp4"
							loop
							autoPlay
						/>
					</div>
				</div>
				<div className="relative h-full flex flex-col items-end justify-between pt-32 px-8 pb-8 flex-1 sm:hidden xm:hidden">
					<div className="flex w-1/2 gap-20">
						{socialItems.map((item) => (
							<div
								key={item.id}
								id="socials">
								<div className="flex flex-col gap-1">
									{item.links1?.map((link) => (
										<Link
											id="link"
											key={link.id}
											className="text-sm text-white uppercase translate-y-7 opacity-0 relative font-medium"
											href={link.href}>
											{link.title}
										</Link>
									))}
								</div>
								<div className="flex flex-col gap-1">
									{item.links2?.map((link) => (
										<Link
											id="link"
											key={link.id}
											className="text-sm text-white uppercase translate-y-7 opacity-0 relative font-medium"
											href={link.href}>
											{link.title}
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
					<motion.div className="overflow-hidden flex">
						{"avaro".split("").map((item: string, i: number) => (
							<motion.p
								className="text-[300px] text-white uppercase font-normal leading-tight tracking-tighter"
								initial={{ y: "100%" }}
								whileInView={menuOpen ? { y: 0 } : { y: "100%" }}
								transition={{
									delay: i * 0.08,
									duration: 1.2,
									ease: [0.4, 0, 0.2, 1],
								}}
								key={i}>
								{item}
							</motion.p>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
