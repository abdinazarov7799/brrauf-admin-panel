import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {Button, Input, Pagination, Popover, Row, Select, Space, Table} from "antd";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import HasAccess, {hasAccess} from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";
import {useStore} from "../../../store/index.js";
import {EyeOutlined} from "@ant-design/icons";

const ExerciseResultContainer = () => {
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [trainingCenterId,setTrainingCenterId] = useState(null);
    const [searchCenter,setSearchCenter] = useState(null);
    const user = useStore(state => get(state,'user',{}))
    const {data,isLoading,refetch} = usePaginateQuery({
        key: KEYS.exercise_result_list,
        url: URLS.exercise_result_list,
        params: {
            params: {
                size,
                trainingCenterId
            }
        },
        page
    });

    const { data:centers,isLoading:isLoadingCenters } = useGetAllQuery({
        key: KEYS.training_center_list,
        url: URLS.training_center_list,
        params: {
            params: {
                search: searchCenter,
                size: 1000
            }
        },
        enabled: hasAccess(get(user,'roles',[]),[config.ROLES.ROLE_SUPER_ADMIN])
    })
    const columns = [
        {
            title: t("Student full name"),
            dataIndex: "student",
            key: "fullName",
            render: (data) => {
                return get(data,'fullName')
            }
        },
        {
            title: t("Student phone number"),
            dataIndex: "student",
            key: "phoneNumber",
            render: (data) => {
                return get(data,'phoneNumber')
            }
        },
        {
            title: t("Exercise name"),
            dataIndex: "exercise",
            key: "exerciseName",
            render: (data) => {
                return get(data,'name')
            }
        },
        {
            title: t("Exercise created time"),
            dataIndex: "exercise",
            key: "createdTime",
            render: (data) => {
                return get(data,'createdTime')
            }
        },
        {
            title: t("Exercise type"),
            dataIndex: "exercise",
            key: "exerciseType",
            render: (data) => {
                return get(data,'exerciseType.name')
            }
        },
        {
            title: t("Scores"),
            dataIndex: "scores",
            key: "scores",
            render: (data) => {
                return (
                    <Popover
                        content={
                            <Space direction={"vertical"}>{data?.map((item) => (<Text>{get(item, 'criteriaName')}: {get(item,'score')}</Text>))}</Space>
                        }
                        title={t("Scores")}
                    >
                        <Button type="primary" icon={<EyeOutlined />} />
                    </Popover>
                )
            }
        },
    ]
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <HasAccess access={[config.ROLES.ROLE_SUPER_ADMIN]}>
                    <Select
                        style={{width: "100%"}}
                        showSearch
                        allowClear
                        placeholder={t("Training center")}
                        optionFilterProp="children"
                        onSearch={(e) => setSearchCenter(e)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        loading={isLoadingCenters}
                        onChange={(e) => setTrainingCenterId(e)}
                        options={get(centers,'data.data.content')?.map((item) => {
                            return {
                                value: get(item,'id'),
                                label: get(item,'name')
                            }
                        })}
                    />
                </HasAccess>
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

export default ExerciseResultContainer;
