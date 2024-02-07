import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Badge,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Scrollbar } from "src/components/scrollbar";
import { TodoCreate } from "./todo-create";

import useDeleteTodoById from "src/hooks/use-delete-todo-by-id";
import useTodoInactivateHandler from "src/hooks/use-inactivate-todo-by-id";
import useTodoActivateHandler from "src/hooks/use-activate-todo-by-id";

export const TodosTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const handleTodoInactivate = useTodoInactivateHandler();

  const handleTodoActivate = useTodoActivateHandler();


  const handleTodoDelete = useDeleteTodoById();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const [isTodoEditOpen, setTodoEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleTodoEditOpen = (todolist) => {
    setEditingTodo(todolist);
    setTodoEditOpen(true);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((todoList) => {
                const isSelected = selected.includes(todoList.id);
                return (
                  <TableRow hover key={todoList.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(todoList.id);
                          } else {
                            onDeselectOne?.(todoList.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{todoList.title}</TableCell>
                    <TableCell>{todoList.description}</TableCell>
                    <TableCell>
                      {todoList.status == "Active" ? (
                        <Badge color="success" variant="dot">
                          Ativo
                        </Badge>
                      ) : todoList.status == "Pending" ? (
                        <Badge color="warning" variant="dot">
                          Pendente
                        </Badge>
                      ) : (
                        <Badge color="info" variant="dot">
                          Encerrado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell width={"200px"}>
                      {todoList.status === "Active" || todoList.status === "Pending" ? (
                        <Tooltip title="Completar">
                          <IconButton onClick={() => handleTodoInactivate(todoList)}>
                            <EventBusyIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Ativar">
                          <IconButton onClick={() => handleTodoActivate(todoList)}>
                            <EventAvailableIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleTodoEditOpen(todoList)}>
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Deletar">
                        <IconButton onClick={() => handleTodoDelete(todoList)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isTodoEditOpen && (
              <TodoCreate
                open={isTodoEditOpen}
                onClose={() => {
                  setTodoEditOpen(false);
                  setEditingTodo(null);
                }}
                mode="edit"
                editingTodo={editingTodo}
              />
            )}
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TodosTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
