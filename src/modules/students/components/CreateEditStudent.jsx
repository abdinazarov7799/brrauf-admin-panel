import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Form, Input, Select} from "antd";
import {get} from "lodash";
import usePutQuery from "../../../hooks/api/usePutQuery.js";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";

const CreateEditStudent = ({itemData,setIsModalOpen,refetch}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [searchCenter,setSearchCenter] = useState(null);

    const { mutate, isLoading } = usePostQuery({
        listKeyId: KEYS.student_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePutQuery({
        listKeyId: KEYS.student_list,
    });
    const { data:centers,isLoading:isLoadingCenters } = useGetAllQuery({
        key: KEYS.training_center_list,
        url: URLS.training_center_list,
        params: {
            params: {
                search: searchCenter,
                size: 1000
            }
        }
    })

    useEffect(() => {
        form.setFieldsValue({
            fullName: get(itemData,'fullName'),
            password: get(itemData,'password'),
            phoneNumber: get(itemData,'phoneNumber'),
            username: get(itemData,'username'),
            trainingCenterId: get(itemData,'trainingCenterId')
        });
    }, [itemData]);

    const onFinish = (values) => {
        if (itemData){
            mutateEdit(
                { url: `${URLS.student_edit}/${get(itemData,'id')}`, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }else {
            mutate(
                { url: URLS.student_add, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }
    };
    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    label={t("fullName")}
                    name="fullName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("username")}
                    name="username"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("phoneNumber")}
                    name="phoneNumber"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("password")}
                    name="password"
                    rules={[{required: true,}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={t("trainingCenterId")}
                    name="trainingCenterId"
                    rules={[{required: true,}]}
                >
                    <Select
                        showSearch
                        placeholder={t("Training center")}
                        optionFilterProp="children"
                        onSearch={(e) => setSearchCenter(e)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        loading={isLoadingCenters}
                        options={get(centers,'data.data.content')?.map((item) => {
                            return {
                                value: get(item,'id'),
                                label: get(item,'name')
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading || isLoadingEdit}>
                        {itemData ? t("Edit") : t("Create")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEditStudent;
