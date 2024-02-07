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
import { ProductCreate } from "./product-create";

import useDeleteProductById from "src/hooks/use-delete-product-by-id";
import useProductInactivateHandler from "src/hooks/use-inactivate-product-by-id";
import useProductActivateHandler from "src/hooks/use-activate-product-by-id";

export const ProductsTable = (props) => {
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

  const handleProductInactivate = useProductInactivateHandler();

  const handleProductActivate = useProductActivateHandler();


  const handleProductDelete = useDeleteProductById();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const [isProductEditOpen, setProductEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductEditOpen = (todolist) => {
    setEditingProduct(todolist);
    setProductEditOpen(true);
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
                          <IconButton onClick={() => handleProductInactivate(todoList)}>
                            <EventBusyIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Ativar">
                          <IconButton onClick={() => handleProductActivate(todoList)}>
                            <EventAvailableIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleProductEditOpen(todoList)}>
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Deletar">
                        <IconButton onClick={() => handleProductDelete(todoList)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isProductEditOpen && (
              <ProductCreate
                open={isProductEditOpen}
                onClose={() => {
                  setProductEditOpen(false);
                  setEditingProduct(null);
                }}
                mode="edit"
                editingProduct={editingProduct}
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

ProductsTable.propTypes = {
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
