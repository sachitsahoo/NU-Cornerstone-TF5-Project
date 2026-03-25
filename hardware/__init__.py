"""Hardware integration: Pico serial reader."""

from hardware.serial_worker import SerialWorker, auto_detect_pico_port, SERIAL_BAUD

__all__ = ["SerialWorker", "auto_detect_pico_port", "SERIAL_BAUD"]
