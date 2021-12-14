import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a className={styles.link}>
          <img src="/logo.svg" alt="spacetraveling." />
        </a>
      </Link>
    </header>
  );
}
