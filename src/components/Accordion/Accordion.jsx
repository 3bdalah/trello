import AccordionItem from "../AccordionItem/AccordionItem";
import Questions from "../../Utils/QuestionsAccordion";
const Accordion = () => {
  return (
    <div className="max-w-md mx-auto mt-5 min-h-screen  ">
      {Questions.map((ques, index) => {
        return (
          <AccordionItem
            key={index}
            title={ques.question}
            content={ques.answer}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
