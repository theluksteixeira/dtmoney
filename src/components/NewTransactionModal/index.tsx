import React, { FormEvent } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { api } from "../../services/api";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [title, setTitle] = React.useState("");
    const [value, setValue] = React.useState(0);
    const [category, setCategory] = React.useState("");
    const [type, setType] = React.useState("deposit");

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        console.log('entrou');

        const data = {
            title,
            value,
            category,
            type,
        };
        api.post("/transaction", data);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2> Cadastrar transação</h2>

                <input placeholder="Titulo" value={title} onChange={(event) => setTitle(event.target.value)} />
                <input
                    type="number"
                    placeholder="Preço"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === "deposit"}
                        onClick={() => {
                            setType("deposit");
                        }}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        isActive={type === "withdraw"}
                        onClick={() => {
                            setType("withdraw");
                        }}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}
