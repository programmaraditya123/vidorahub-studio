import { SITE_URL } from "../config/seo";

export function generateSecurityTxt(): string {
  return `Contact: mailto:security@vidorahub.com
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
Policy: ${SITE_URL}/security.txt
`;
}
