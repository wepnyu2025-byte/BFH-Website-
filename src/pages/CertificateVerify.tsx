import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, ShieldCheck, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { verifyCertificatePublicly } from '../services/portalService';
import { CertificateData } from '../types/studentPortal';

export const CertificateVerify: React.FC = () => {
  const { certId } = useParams<{ certId: string }>();
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (certId) {
      verifyCertificatePublicly(certId).then((res) => {
        setCert(res);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [certId]);

  return (
    <div className="pt-28 md:pt-36">
      <Section bg="white" className="pt-[85px] pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
              Public Accreditation Registry
            </span>
            <Headline as="h1" align="auto">
              {"Official Certificate {{Verification}}"}
            </Headline>
            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              Verify credential authenticity issued by the Baby First Health Clinical Education Board.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="max-w-[620px] mx-auto">
            {loading ? (
              <div className="bg-white rounded-[32px] p-10 text-center font-body text-teal-950/70">
                Searching credential registry...
              </div>
            ) : cert ? (
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    <span className="font-body font-bold text-xs uppercase tracking-wider text-teal-900">
                      Verified Credential
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cert.status === 'VALID'
                        ? 'bg-teal-100 text-teal-900'
                        : 'bg-red-100 text-red-900'
                    }`}
                  >
                    STATUS: {cert.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase text-teal-950/50 block">Recipient</span>
                    <h2 className="font-body font-bold text-teal-900 text-2xl">
                      {cert.studentName}
                    </h2>
                  </div>

                  <div>
                    <span className="text-xs uppercase text-teal-950/50 block">Conferred Program</span>
                    <p className="font-body font-semibold text-teal-900 text-base">
                      {cert.programTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-body pt-2">
                    <div>
                      <span className="text-teal-950/50 block">Certificate ID</span>
                      <span className="font-mono font-bold text-teal-900">{cert.id}</span>
                    </div>
                    <div>
                      <span className="text-teal-950/50 block">Issue Date</span>
                      <span className="font-semibold text-teal-900">{cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs uppercase text-teal-950/50 block">Issuing Authority</span>
                    <p className="text-xs text-teal-950/80">
                      {cert.issuerInfo}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-[20px] bg-teal-50 text-[11px] text-teal-950/75 leading-relaxed">
                  Notice: In accordance with data privacy regulations, this public registry record displays recipient name, program, and status only. Student contact records and exam grades are confidential.
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-10 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
                <h2 className="font-body font-semibold text-teal-900 text-xl">
                  Certificate Record Not Found
                </h2>
                <p className="text-xs sm:text-sm text-teal-950/75">
                  No certificate matched the reference <strong>{certId}</strong>. Please check the ID or contact admissions support.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-teal-600 text-white text-xs font-bold"
                >
                  Return to Homepage
                </Link>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
