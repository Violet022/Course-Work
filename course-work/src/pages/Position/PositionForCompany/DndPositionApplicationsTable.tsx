import React, { useState } from "react"
import { ApplicationTypeWithStudentInfo } from "../../../utils/types/types"
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Spin, Table } from 'antd';
import PositionApplicationsTable, { positionApplicationsTableColumns } from "../../../components/tables/Tables/PositionApplicationsTable";
import { updatePriorities } from "../../../store/applications/ApplicationsReducer";
import { useAppDispatch } from "../../../hooks/hooks";
import { useParams } from "react-router-dom";

type PropsType = {
    positionApplications: Array<ApplicationTypeWithStudentInfo>,
    areFetching: boolean
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}

const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props['data-row-key'],
    });
  
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      cursor: 'move',
      ...(isDragging ? { position: 'relative', zIndex: 999 } : {}),
    };
  
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const DndPositionApplicationsTable: React.FC<PropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [data, setData] = useState([...props.positionApplications])
    const dispatch = useAppDispatch()
    const params = useParams()
    const positionId = params.id == undefined ? "" : params.id

    const onSavePriorityChanges = () => {
        dispatch(updatePriorities(positionId, data.map(application => application.id)))
        setIsEditMode(false)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 1,
          },
        }),
    );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
          setData((prev) => {
            const activeIndex = prev.findIndex((i) => i.id === active.id);
            const overIndex = prev.findIndex((i) => i.id === over?.id);
            return arrayMove(prev, activeIndex, overIndex);
          });
        }
    };

    return (
        <>
            <Spin spinning={props.areFetching}>
                {
                    isEditMode
                    ?
                        <>
                        
                            <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                                <SortableContext
                                    items={data.map((i) => i.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="edit-priority">
                                        <Table
                                            components={{
                                                body: {
                                                    row: Row,
                                                },
                                            }}
                                            rowKey="id"
                                            columns={positionApplicationsTableColumns}
                                            dataSource={data}
                                            pagination={false}
                                            tableLayout="fixed"
                                        />
                                    </div>
                                </SortableContext>
                            </DndContext>
                            <Button type="primary" style={{marginTop: 12, marginRight: 15}} onClick={onSavePriorityChanges}>
                                Сохранить изменения
                            </Button>
                            <Button type="primary" style={{marginTop: 12}} onClick={() => {setIsEditMode(prev => !prev)}} danger>
                                Отмена
                            </Button>
                        </>
                    :
                        <>
                            <PositionApplicationsTable 
                                positionApplications={props.positionApplications} 
                                areFetching={props.areFetching}
                            />
                            <Button type="primary" style={{marginTop: 12}} onClick={() => {setIsEditMode(prev => !prev)}}>
                                Редактировать приоритетность
                            </Button>
                        </>
                }
            </Spin>
        </>
        
    )
}

export default DndPositionApplicationsTable


