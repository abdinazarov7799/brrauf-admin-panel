import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {Button, Input, Modal, Pagination, Popconfirm, Row, Space, Table} from "antd";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import CreateEditTrainingCenter from "../components/CreateEditTrainingCenter.jsx";

const TrainingCenterContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey,setSearchKey] = useState();
    const [selected,setSelected] = useState(null);
    const [isCreateModalOpenCreate, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.training_center_list,
        url: URLS.training_center_list,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });
    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.training_center_list
    });
    const useDelete = (id) => {
        mutate({url: `${URLS.training_center_delete}/${id}`},{
            onSuccess: () => {
                refetch();
            }
        })
    }
    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("Username"),
            dataIndex: "username",
            key: "username",
        },
        {
            title: t("Password"),
            dataIndex: "password",
            key: "password",
        },
        {
            title: t("Info"),
            dataIndex: "info",
            key: "info",
        },
        {
            title: t("Edit / Delete"),
            width: 120,
            fixed: 'right',
            key: 'action',
            render: (props, data, index) => (
                <Space key={index}>
                    <Button icon={<EditOutlined />} onClick={() => {
                        setIsEditModalOpen(true)
                        setSelected(data)
                    }} />
                    <Popconfirm
                        title={t("Delete")}
                        description={t("Are you sure to delete?")}
                        onConfirm={() => useDelete(get(data,'id'))}
                        okText={t("Yes")}
                        cancelText={t("No")}
                    >
                        <Button danger icon={<DeleteOutlined />}/>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <Space size={"middle"}>
                    <Input.Search
                        placeholder={t("Search")}
                        onChange={(e) => setSearchKey(e.target.value)}
                        allowClear
                    />
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        {t("New")}
                    </Button>
                    <Modal
                        title={t('Create')}
                        open={isCreateModalOpenCreate}
                        onCancel={() => setIsCreateModalOpen(false)}
                        footer={null}
                    >
                        <CreateEditTrainingCenter setIsModalOpen={setIsCreateModalOpen} refetch={refetch}/>
                    </Modal>
                </Space>
                <Modal
                    title={t("Edit")}
                    open={isEditModalOpen}
                    onCancel={() => setIsEditModalOpen(false)}
                    footer={null}
                >
                    <CreateEditTrainingCenter
                        itemData={selected}
                        setIsModalOpen={setIsEditModalOpen}
                        refetch={refetch}
                    />
                </Modal>
                <Table
                    columns={columns}
                    dataSource={get(data,'data.data.content',[])}
                    bordered
                    size={"middle"}
                    pagination={false}
                    loading={isLoading}
                    scroll={{ x: true }}
                />

                <Row justify={"end"} style={{marginTop: 10}}>
                    <Pagination
                        current={page+1}
                        onChange={(page) => setPage(page - 1)}
                        total={get(data,'data.data.totalPages') * 10 }
                        showSizeChanger={false}
                    />
                </Row>
            </Space>
        </Container>
    );
};

export default TrainingCenterContainer;
