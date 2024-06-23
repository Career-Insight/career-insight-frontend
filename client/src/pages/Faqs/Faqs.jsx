// src/pages/Faqs/Faqs.jsx
import React from "react";
import faqs from "./faqsdata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import "./faqs.css";
import Animationgif2 from "../../images/txC505GL40.gif";
import { Helmet } from "react-helmet";

const Faqs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | FAQs</title>
      </Helmet>{" "}
      <div className="flex flex-col px-5">
        <div className="row items-center pt-5">
          <div className="col-md-6 mb-3">
            <div>
              <h1 className="text-5xl font-bold text-pc">Questions?</h1>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div>
              <p className="leading-8">
                <span className="text-bc">
                  if you have question, we have answers for you here. in case we
                  don't, please feel free to reach out to us here
                </span>
                <span className="text-pc ml-2">
                  "career.insight360@gmail.com"
                </span>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-bc">
                <i class="fa-regular fa-face-grin-wink mr-2 text-pc"></i>feel
                free to find your answers
              </h1>{" "}
              <div className="w-100 h-100">
                <img className="w-50" src={Animationgif2} alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger>{faq.category}</AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div>
                        <Accordion>
                          {faq.questions.map((item, idx) => (
                            <AccordionItem key={idx} value={`item-${idx + 1}`}>
                              <AccordionTrigger>{item.q}</AccordionTrigger>
                              <AccordionContent>{item.a}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
