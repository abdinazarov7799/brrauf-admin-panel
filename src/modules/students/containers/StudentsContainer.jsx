import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {Button, Input, Modal, Pagination, Popconfirm, Row, Space, Table} from "antd";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import {DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import CreateEditStudent from "../components/CreateEditStudent.jsx";
import {request} from "../../../services/api/index.js";

const StudentsContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey,setSearchKey] = useState();
    const [selected,setSelected] = useState(null);
    const [isCreateModalOpenCreate, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.student_list,
        url: URLS.student_list,
        params: {
            params: {
                size,
                search: searchKey
            }
        },
        page
    });

    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.student_list
    });
    const useDelete = (id) => {
        mutate({url: `${URLS.student_delete}/${id}`},{
            onSuccess: () => {
                refetch();
            }
        })
    }
    const navigateToCertificate = (id) => {
        request.get(`${URLS.get_certificate_by_student_id}/${id}`).then(res => {
            window.open(get(res,'data'), '_blank')
        }).catch(err => {
            console.log(err)
        })
    }
    const columns = [
        {
            title: t("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("Full name"),
            dataIndex: "fullName",
            key: "fullName"
        },
        {
            title: t("Username"),
            dataIndex: "username",
            key: "username",
        },
        {
            title: t("phoneNumber"),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: t("password"),
            dataIndex: "password",
            key: "password",
        },
        {
            title: t("Training center name"),
            dataIndex: "trainingCenterName",
            key: "trainingCenterName",
        },
        {
            title: t("Get sertificate"),
            key: "getSertificate",
            width: 130,
            dataIndex: "id",
            render: (id) => {
                return <Button
                    block
                    icon={<DownloadOutlined />}
                    type={"primary"}
                    onClick={() => {
                        navigateToCertificate(id)
                    }}
                >
                    {t("Download")}
                </Button>
            }
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
                        <CreateEditStudent setIsModalOpen={setIsCreateModalOpen} refetch={refetch}/>
                    </Modal>
                </Space>
                <Modal
                    title={t("Edit")}
                    open={isEditModalOpen}
                    onCancel={() => setIsEditModalOpen(false)}
                    footer={null}
                >
                    <CreateEditStudent
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

export default StudentsContainer;
