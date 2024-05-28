import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Form, Input, Select} from "antd";
import {get} from "lodash";
import usePutQuery from "../../../hooks/api/usePutQuery.js";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";

const CreateEditExercise = ({itemData,setIsModalOpen,refetch}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [search,setSearch] = useState(null);

    const { mutate, isLoading:isLoadingCreate } = usePostQuery({
        listKeyId: KEYS.exercise_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePutQuery({
        listKeyId: KEYS.exercise_list,
    });

    const { data,isLoading} = useGetAllQuery({
        key: KEYS.exercise_type_list,
        url: URLS.exercise_type_list,
        params: {
            params: {
                search,
                size: 1000
            }
        }
    })

    useEffect(() => {
        form.setFieldsValue({
            name: get(itemData,'name'),
            exerciseTypeId: get(itemData,'exerciseType.id'),
        });
    }, [itemData]);

    const onFinish = (values) => {
        if (itemData){
            mutateEdit(
                { url: `${URLS.exercise_edit}/${get(itemData,'id')}`, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }else {
            mutate(
                { url: URLS.exercise_add, attributes: values },
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
                    label={t("Name")}
                    name="name"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t("Exercise type")}
                    name="exerciseTypeId"
                    rules={[{required: true,}]}
                >
                    <Select
                        showSearch
                        placeholder={t("Exercise type")}
                        optionFilterProp="children"
                        onSearch={(e) => setSearch(e)}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        loading={isLoading}
                        options={get(data,'data.data.content')?.map((item) => {
                            return {
                                value: get(item,'id'),
                                label: get(item,'name')
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoadingCreate || isLoadingEdit}>
                        {itemData ? t("Edit") : t("Create")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEditExercise;
