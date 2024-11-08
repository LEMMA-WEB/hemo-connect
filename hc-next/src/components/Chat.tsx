"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { ScrollArea } from "./ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export type Message = {
  query?: string;
  response?: string;
  refferences?: any;
};

interface ChatProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
  messages: Message[];
  loading: boolean;
  handleNewMessage: (query: string) => Message[];
}

const Chat: React.FC<ChatProps> = ({
  messages,
  loading,
  handleNewMessage,
  ...props
}) => {
  const suggestions = ["Jak se máte?", "Už jste zkoušel sebevraždu??"];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //   const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);
  const [query, setQuery] = useState("");

  //   function handleNewMessage(query: string) {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         query,
  //       },
  //     ]);

  //     setQuery("");

  //     setLoading(true);

  //     setTimeout(() => {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           response: "Nevím,",
  //           refferences: [],
  //         },
  //         {
  //           response: "Zabij se radši ty",
  //           refferences: [
  //             {
  //               id: 235,
  //               start: 135,
  //               end: 145,
  //             },
  //           ],
  //         },
  //       ]);

  //       setLoading(false);
  //     }, 3000);
  //   }

  useEffect(() => {
    if (messages.length > 0) {
      cardRef?.current?.scrollIntoView({ behavior: "smooth" }); //Use scrollIntoView to automatically scroll to my ref
    }
  }, [messages.length]);

  return (
    <div className="flex h-full flex-col justify-around p-8">
      <h1 className="pb-4 text-4xl font-bold">Název chatu nebo kdoví co</h1>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Record</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      ;
      <div className="flex grow flex-col gap-4">
        <ScrollArea className="h-96 max-h-[60vh] w-full rounded-xl border-2 border-black transition-all">
          <div className="p-4">
            {messages.map((message, index) => (
              <div
                ref={index + 1 === messages.length ? cardRef : null}
                key={index}
                className={`${
                  message.query ? "flex justify-end" : "flex justify-start"
                }`}
              >
                <div
                  className={`${
                    message.query ? "bg-red-700 text-white" : "text-gray-800"
                  } flex flex-col justify-start gap-2 rounded-xl px-4 py-2`}
                >
                  <p className="px-2">{message.query ?? message.response}</p>
                  {message.refferences?.length > 0 ? (
                    <div>
                      <Button
                        variant="bordered"
                        size="sm"
                        color="primary"
                        radius="lg"
                        className=""
                        onPress={onOpen}
                      >
                        Zdroj <FaArrowRight />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <AnimatePresence>
          {suggestions.length > 0 && query.length == 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="flex gap-2"
            >
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  color="primary"
                  radius="lg"
                  className=""
                  onClick={() => handleNewMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!query) return;
          handleNewMessage(query);
          setQuery("");
        }}
        className="mt-4 flex items-center gap-4"
      >
        <Input
          minLength={1}
          value={query}
          onValueChange={setQuery}
          type="text"
        />

        <Button
          type="submit"
          isIconOnly
          isLoading={loading}
          color="primary"
          variant="shadow"
          radius="lg"
          className=""
        >
          <FaPaperPlane />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
