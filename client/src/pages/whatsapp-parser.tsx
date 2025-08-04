import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppParser from "@/components/whatsapp-parser";
import { useTranslation } from "@/lib/i18n";

export default function WhatsAppParserPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('whatsappParser')}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('whatsappDescription')}
          </p>
        </div>
      </section>

      {/* Parser Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhatsAppParser />
        </div>
      </section>

      <Footer />
    </div>
  );
}