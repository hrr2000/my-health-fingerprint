import {useState} from "react";

export const AddFieldModalController = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [fieldObject, setFieldObject] = useState({});
  const [cell, setCell] = useState({
    rowIndex: 0,
    columnIndex: 0,
  });

  function openModal(rowIndex: number, columnIndex: number) {
    setCell({
      rowIndex,
      columnIndex,
    });
    setIsOpen(true);
    setFieldObject({});
  }

  function afterOpenModal() {
    return;
  }

  function closeModal() {
    setModalStep(0);
    setIsOpen(false);
  }

  return {
    fieldObject,
    modalStep,
    modalIsOpen,
    cell,
    setCell,
    setFieldObject,
    setModalStep,
    setIsOpen,
    openModal,
    afterOpenModal,
    closeModal,
  };
};

export type IAddFieldModalController = ReturnType<
  typeof AddFieldModalController
  >;