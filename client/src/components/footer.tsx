import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <span className="text-2xl font-bold text-emerald-600">
                GoPilgrims
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              {t("footer.companyDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/trips">
                  <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                    {t("footer.browseTrips")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                    {t("reviews")}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/organizer-signup">
                  <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                    {t("footer.becomeOrganizer")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {t("footer.support")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t("footer.helpCenter")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t("footer.contactUs")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t("footer.safetyGuidelines")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}