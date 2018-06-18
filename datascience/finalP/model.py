import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv1D, MaxPooling1D, Flatten, Activation

def encode_by_ae(ae, data, batch_size = 32, verbose = True):
    model = Sequential()
    model.add(ae.get_encoder())
    return model.predict(data, batch_size = batch_size, verbose = verbose)


class AutoEncoder(Sequential):
    def __init__(self, input_size, encode_size, dropout = 0.05, encoder_id = 0):
        super(AutoEncoder, self).__init__()
        self.encoder_id = encoder_id
        self.add(Dense(encode_size, input_shape = (input_size,), activation = 'relu', name = 'encoder{}'.format(encoder_id)))
        self.add(Dropout(dropout))
        self.add(Dense(input_size, activation = 'sigmoid', name = 'decoder{}'.format(encoder_id)))
        self.add(Dropout(dropout))

    def get_encoder(self):
        return self.get_layer('encoder{}'.format(self.encoder_id))

    def get_decoder(self):
        return self.get_layer('decoder{}'.format(self.encoder_id))


class StackedAutoEncoder(Sequential):
    def __init__(self, auto_encoders):
        super(StackedAutoEncoder, self).__init__()
        encoder_layers = [ae.get_encoder() for ae in auto_encoders]
        decoder_layers = reversed([ae.get_decoder() for ae in auto_encoders])
        for e in encoder_layers:
            self.add(e)
        for d in decoder_layers:
            self.add(d)


class CNN(Sequential):
    def __init__(self, input_size = 1500, dropout = 0.05):
        super(CNN, self).__init__()
        self.add(Conv1D(200, 5, input_shape = (input_size,1), activation = 'relu'))
        self.add(Dropout(dropout))
        self.add(Conv1D(100, 4, activation = 'relu'))
        self.add(Dropout(dropout))
        self.add(MaxPooling1D(2))
        self.add(Flatten())
        denses = [600, 500, 400, 300, 200, 100, 50]
        for dense in denses:
            self.add(Dense(dense, activation = 'relu'))
            self.add(Dropout(dropout))
        self.add(Dense(17, activation = 'softmax'))


