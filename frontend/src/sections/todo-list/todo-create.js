import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Paper, Button, SvgIcon, Modal, Box } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";
import { Col, Form, Drawer, Input, Row, Radio, Divider } from "antd";
import CharacterCountInput from "src/components/caracter-count-input";
import useCreateTodo from "src/hooks/use-create-todo";
import useUpdateTodoById from "src/hooks/use-update-todo-by-id";

export const TodoCreate = (props) => {
  const { isEditMode = props.mode === "edit", isDetailViewMode = props.mode === "details" } = props;

  const [form] = Form.useForm();

  const initialValues = {
    id: props.editingTodo?.id || "",
    title: props.editingTodo?.title || "",
    description: props.editingTodo?.description || "",
    status: props.editingTodo?.status || "Ativo",
  };
  
  const defaultTodoValues = {
    title: "",
    description: "",
    status: "Ativo",
  };

  const useSave = async () => {
    let updateHook, createHook;

    try {
      const validatedValues = await form.validateFields();

      const parsedValues = {
        ...defaultTodoValues,
        ...validatedValues,
      };

      if (isEditMode) {
        const todoId = props.editingTodo?.id;
        updateHook = useUpdateTodoById(parsedValues, todoId);
      } else {
        createHook = useCreateTodo(parsedValues);
        form.resetFields();
      }
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }

    if (updateHook instanceof Function) {
      await updateHook();
    } else if (createHook instanceof Function) {
      await createHook();
    }
  };

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <Drawer
      onClose={props.onClose}
      open={props.open}
      width={920}
      zIndex={2000}
      closable={false}
      footer={true}
      style={{
        padding: 20,
      }}
    >
      <Paper>
        <Typography sx={{ p: 2 }}>{isEditMode ? "Editar to-do" : "Novo to-do"}</Typography>{" "}
      </Paper>
      <Form
        form={form}
        initialValues={initialValues}
        {...formItemLayout}
        layout="vertical"
        style={{
          marginTop: 30,
          padding: 10,
        }}
      >
        <Row gutter={16}>
          <Col span={16}>
            <CharacterCountInput
              label="Título"
              name="title"
              placeholder="ex.: Buscar o luiz na creche"
              maxLength={80}
              form={form}
            />
          </Col>
          <Col span={24}>
            <CharacterCountInput
              label="Descrição"
              name="description"
              placeholder="ex.: Não esquecer de levar o iorgute."
              maxLength={120}
              form={form}
              rows={2}
            />
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Selecione uma opção" }]}
            >
              <Radio.Group name="status">
                <Radio value="Active">Ativo</Radio> 
                <Radio value="Pending">Pendente</Radio>
                <Radio value="Completed">Completado</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} justify="end">
          <Col>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  {isEditMode ? <PencilSquareIcon /> : <PlusIcon />}
                </SvgIcon>
              }
              onClick={useSave}
            >
              {isEditMode ? "Salvar Alterações" : "Adicionar Produto"}
            </Button>
          </Col>
          <Col>
            {!isDetailViewMode && (
              <Button onClick={props.onClear} type="reset">
                Limpar Campos
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

TodoCreate.propTypes = {
  isEditMode: PropTypes.func,
  isDetailViewMode: PropTypes.func,
};
