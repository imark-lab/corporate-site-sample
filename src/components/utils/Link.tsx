import * as React from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link"

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const {
      to,
      linkAs,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      locale,
      ...other
    } = props

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        locale={locale}
      >
        <a ref={ref} {...other} />
      </NextLink>
    )
  },
)

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps["as"]
  href: NextLinkProps["href"]
  noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don"t have roles.
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === "string" ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal =
    typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href as string} ref={ref as any} {...other} />
    }

    return <MuiLink className={className} href={href as string} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref as any} to={href} {...other} />
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
      style={{ textDecoration: "none" }}
    />
  )
})

export default Link