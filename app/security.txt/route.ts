import { textResponse } from "@/lib/seo/xml";

export function GET() {
  return textResponse(`Contact: mailto:security@vidorahub.com
Preferred-Languages: en
Canonical: https://studio.vidorahub.com/.well-known/security.txt
Policy: https://studio.vidorahub.com/security.txt
`);
}
