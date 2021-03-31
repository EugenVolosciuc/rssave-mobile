import React from 'react'

import MainLayout from '../components/layouts/MainLayout'
import CreateFeedForm from '../components/forms/CreateFeedForm'

const AddFeed = () => {
    const headerOptions = {
        title: 'Add Feed',
        showHamburger: false,
    }

    return (
        <MainLayout headerOptions={headerOptions}>
            <CreateFeedForm />
        </MainLayout>
    )
}

export default AddFeed
