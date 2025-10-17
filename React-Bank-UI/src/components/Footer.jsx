import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="HooBank logo"
          className="w-[266px] h-[72.14px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A new way to make the payments easy, reliable and secure.
        </p>
      </div>

      <nav
        aria-labelledby="footer-navigation"
        className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10"
      >
        <h2 id="footer-navigation" className="sr-only">
          Footer navigation
        </h2>

        {footerLinks.map((footerlink, colIndex) => (
          <section
            key={footerlink.title}
            aria-labelledby={`footer-heading-${colIndex}`}
            className="flex flex-col ss:my-0 my-4 min-w-[150px]"
          >
            <h3
              id={`footer-heading-${colIndex}`}
              className="font-poppins font-medium text-[18px] leading-[27px] text-white"
            >
              {footerlink.title}
            </h3>

            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"}`}
                >
                  <a
                    href={link.link || "#"}
                    className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary"
                    target={link.link ? "_blank" : "_self"}
                    rel={link.link ? "noopener noreferrer" : undefined}
                    aria-label={`Link to ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ {new Date().getFullYear()} HooBank. All Rights Reserved.
      </p>

      <ul className="flex flex-row md:mt-0 mt-6" aria-label="Social media links">
        {socialMedia.map((social, index) => (
          <li key={social.id} className={`${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}>
            <a
              href={social.link || "#"}
              target={social.link ? "_blank" : "_self"}
              rel={social.link ? "noopener noreferrer" : undefined}
              aria-label={`Link to ${social.id} profile`}
            >
              <img
                src={social.icon}
                alt={`${social.id} icon`}
                className="w-[21px] h-[21px] object-contain cursor-pointer"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
