import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Persone } from "interfaces";
import { Portal } from "..";

interface PersoneDetailDialogProps {
  persone: Persone;
  onClose(): void;
}

export function PersoneDetailDialog({
  persone,
  onClose,
}: PersoneDetailDialogProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Portal>
      <div
        className="bg-black fixed left-0 top-0 bottom-0 right-0 overflow-scroll bg-opacity-50"
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        aria-label="overlay for dialog"
        tabIndex={0}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5">
        <XIcon
          className="h-5 w-5 cursor-pointer absolute right-2 top-2"
          onClick={onClose}
        />
        <div className="mt-3 flex space-x-5">
          <div>
            <p className="text-xl font-semibold mb-2">{persone.name}</p>

            <img src={persone.image} alt="" />
          </div>
          <div>
            <p className="mt-7">
              Species:
              <span className="text-lg text-blue-600 ">{persone.species}</span>
            </p>
            <p>
              Status:
              <span className="text-lg text-blue-600 ">{persone.status}</span>
            </p>
            <p>
              Gender:
              <span className="text-lg text-blue-600 ">{persone.gender}</span>
            </p>
            <p>
              Location name:
              <span className="text-lg text-blue-600 ">
                {persone.location.name}
              </span>
            </p>
            {persone.type && (
              <p>
                Type:
                <span className="text-lg text-blue-600 ">{persone.type}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
